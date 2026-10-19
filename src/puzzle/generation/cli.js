import fs from 'fs';
import path from 'path';
import { generatePuzzleCollection } from './generator';
import { collectionFileName } from './output';

const HELP = `Wood Block Puzzle collection generator

Usage: generate-puzzles [options]

Options:
  --count <number>               Puzzles to accept (default: 10)
  --seed <uint32>                Deterministic seed (default: 1)
  --simulation-batches <number>  Complete trays used to derive each board (default: 6)
  --batch-attempts <number>      Attempts allowed for each simulated tray (default: 50)
  --candidate-attempts <number>  Maximum challenge candidates (default: 1000)
  --difficulty <target>          any, easy, medium, or hard (default: any)
  --near-duplicate-distance <n>  Reject aligned boards within this distance (default: 0)
  --min-occupied-cells <number>  Inclusive board occupancy minimum (default: 0)
  --max-occupied-cells <number>  Inclusive board occupancy maximum (default: 63)
  --min-legal-first-moves <n>    Inclusive legal first-move minimum (default: 1)
  --max-legal-first-moves <n>    Inclusive legal first-move maximum (default: 1000)
  --tray-search-width <number>   Trays evaluated per simulated board (default: 1)
  --require-feature <names>      Comma-separated reasoning mechanisms; repeatable
  --output <path>                Override public/puzzles output; use - for stdout
  --pretty                       Pretty-print JSON
  --help                         Show this help
`;

function integer(value, option) {
    if (value === undefined || !/^(0|[1-9][0-9]*)$/.test(value)) {
        throw new Error(`${option} requires a non-negative decimal integer`);
    }
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed)) throw new Error(`${option} is outside the safe integer range`);
    return parsed;
}

export function parseArguments(args) {
    const config = {};
    let output;
    let pretty = false;
    let help = false;
    const numeric = {
        '--count': 'count',
        '--seed': 'seed',
        '--simulation-batches': 'simulationBatches',
        '--batch-attempts': 'maxBatchAttempts',
        '--candidate-attempts': 'maxCandidateAttempts',
        '--near-duplicate-distance': 'nearDuplicateDistance',
        '--min-occupied-cells': 'minOccupiedCells',
        '--max-occupied-cells': 'maxOccupiedCells',
        '--min-legal-first-moves': 'minLegalFirstMoves',
        '--max-legal-first-moves': 'maxLegalFirstMoves',
        '--tray-search-width': 'traySearchWidth',
    };

    for (let index = 0; index < args.length; index++) {
        const option = args[index];
        if (Object.prototype.hasOwnProperty.call(numeric, option)) {
            config[numeric[option]] = integer(args[++index], option);
        } else if (option === '--output') {
            output = args[++index];
            if (!output) throw new Error('--output requires a path');
        } else if (option === '--difficulty') {
            config.difficultyTarget = args[++index];
            if (!config.difficultyTarget) throw new Error('--difficulty requires a target');
        } else if (option === '--require-feature') {
            const value = args[++index];
            if (!value) throw new Error('--require-feature requires a name');
            config.requiredMechanisms = [
                ...(config.requiredMechanisms || []),
                ...value.split(',').filter(Boolean),
            ];
        } else if (option === '--pretty') {
            pretty = true;
        } else if (option === '--help') {
            help = true;
        } else {
            throw new Error(`Unknown option: ${option}`);
        }
    }
    return { config, output, pretty, help };
}

export function run(args, io = {}) {
    const stdout = io.stdout || process.stdout;
    const stderr = io.stderr || process.stderr;
    const writeFile = io.writeFile || fs.writeFileSync;
    const makeDirectory = io.makeDirectory || fs.mkdirSync;
    const workingDirectory = io.workingDirectory || process.cwd();
    const options = parseArguments(args);
    if (options.help) {
        stdout.write(HELP);
        return 0;
    }

    const started = Date.now();
    const collection = generatePuzzleCollection(options.config);
    const json = `${JSON.stringify(collection, null, options.pretty ? 2 : 0)}\n`;
    const output = options.output || path.join(
        workingDirectory,
        'public',
        'puzzles',
        collectionFileName(collection),
    );
    if (output === '-') {
        stdout.write(json);
    } else {
        makeDirectory(path.dirname(output), { recursive: true });
        writeFile(output, json, 'utf8');
    }
    const elapsed = Date.now() - started;
    const stats = collection.statistics;
    stderr.write(`Generated ${stats.acceptedCount} puzzles from ${stats.candidateAttempts} boards and ${stats.trayEvaluations} trays (${stats.solvableTrayEvaluations} solvable) in ${elapsed}ms; rejected unsolvable=${stats.unsolvableRejections}, simulation=${stats.simulationFailures}, quality=${stats.qualityRejections}, difficulty=${stats.difficultyRejections}, mechanism=${stats.mechanismRejections}, exact-duplicate=${stats.exactDuplicateRejections}, near-duplicate=${stats.nearDuplicateRejections} -> ${output === '-' ? 'stdout' : output}\n`);
    return 0;
}

try {
    process.exitCode = run(process.argv.slice(2));
} catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    if (error.statistics) process.stderr.write(`${JSON.stringify(error.statistics)}\n`);
    process.exitCode = 1;
}
