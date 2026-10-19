import fs from 'fs';
import { analyzePlayerOutcomes } from './report';
import { fitCalibrationProfile } from './profile';

const HELP = `Wood Block Puzzle difficulty calibration

Usage: calibrate-puzzles --input <outcomes.json> [options]

Options:
  --input <path>                JSON array of anonymous outcome records
  --output <path>               Write result to a file instead of stdout
  --fit-profile                 Fit a threshold calibration profile
  --min-samples <number>        Minimum total profile samples (default: 30)
  --min-tier-samples <number>   Minimum samples per fitted tier (default: 5)
  --target-easy <basis-points>  Target easy completion rate (default: 8000)
  --target-medium <basis-points> Target medium completion rate (default: 5500)
  --target-hard <basis-points>  Target hard completion rate (default: 3000)
  --pretty                      Pretty-print JSON
  --help                        Show this help
`;

function integer(value, option) {
    if (value === undefined || !/^(0|[1-9][0-9]*)$/.test(value)) {
        throw new Error(`${option} requires a non-negative decimal integer`);
    }
    const parsed = Number(value);
    if (!Number.isSafeInteger(parsed)) throw new Error(`${option} is outside the safe integer range`);
    return parsed;
}

export function parseCalibrationArguments(args) {
    const options = { pretty: false, fitProfile: false, profileOptions: {} };
    const targets = {};
    for (let index = 0; index < args.length; index++) {
        const option = args[index];
        if (option === '--input' || option === '--output') {
            const value = args[++index];
            if (!value) throw new Error(`${option} requires a path`);
            options[option === '--input' ? 'input' : 'output'] = value;
        } else if (option === '--fit-profile') options.fitProfile = true;
        else if (option === '--pretty') options.pretty = true;
        else if (option === '--help') options.help = true;
        else if (option === '--min-samples') {
            options.profileOptions.minimumTotalSamples = integer(args[++index], option);
        } else if (option === '--min-tier-samples') {
            options.profileOptions.minimumSamplesPerTier = integer(args[++index], option);
        } else if (option === '--target-easy') targets.easy = integer(args[++index], option);
        else if (option === '--target-medium') targets.medium = integer(args[++index], option);
        else if (option === '--target-hard') targets.hard = integer(args[++index], option);
        else throw new Error(`Unknown option: ${option}`);
    }
    if (Object.keys(targets).length > 0) {
        options.profileOptions.targetCompletionRateBasisPoints = targets;
    }
    return options;
}

export function runCalibration(args, io = {}) {
    const stdout = io.stdout || process.stdout;
    const stderr = io.stderr || process.stderr;
    const readFile = io.readFile || fs.readFileSync;
    const writeFile = io.writeFile || fs.writeFileSync;
    const options = parseCalibrationArguments(args);
    if (options.help) {
        stdout.write(HELP);
        return 0;
    }
    if (!options.input) throw new Error('--input is required');
    const outcomes = JSON.parse(readFile(options.input, 'utf8'));
    const report = analyzePlayerOutcomes(outcomes);
    const result = {
        formatVersion: 1,
        report,
        ...(options.fitProfile
            ? { profile: fitCalibrationProfile(outcomes, options.profileOptions) }
            : {}),
    };
    const json = `${JSON.stringify(result, null, options.pretty ? 2 : 0)}\n`;
    if (options.output) writeFile(options.output, json, 'utf8');
    else stdout.write(json);
    stderr.write(`Analyzed ${report.overall.sampleCount} outcomes${options.fitProfile ? '; fitted profile' : ''}${options.output ? ` -> ${options.output}` : ''}\n`);
    return 0;
}

try {
    process.exitCode = runCalibration(process.argv.slice(2));
} catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
}
