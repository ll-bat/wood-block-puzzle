const userAgent = navigator.userAgent.toLowerCase();
const Android = userAgent.indexOf("android") > -1;

export default Android;