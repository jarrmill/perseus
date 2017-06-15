// Return the portion of a URL between // and /. This is the authority
// portion which is usually just the hostname, but may also include
// a username, password or port. We don't strip those things out because
// we typically want to reject any URL that includes them
const HOSTNAME = /\/\/([^\/]+)/;

// Return the hostname of the URL, with any "www." prefix removed.
// If this is a relative URL with no hostname, return an empty string.
export function getHostname(url) {
    if (!url) {
        return "";
    }
    const match = url.match(HOSTNAME);
    return match ? match[1] : "";
}

// This list of domains that count as internal domains is from
// webapp/content/models.py and webapp/url_util.py
const internalDomains = new Set([
    "khanacademy.org",
    "www.khanacademy.org",
    "kasandbox.org",
    "fastly.kastatic.org",
    "cdn.kastatic.org",
    "KA-youtube-converted.s3.amazonaws.com",
    "KA-share.s3.amazonaws.com",
    "ka-article-iframes.s3.amazonaws.com",
    "ka-cs-algorithms.s3.amazonaws.com",
    "ka-cs-challenge-images.s3.amazonaws.com",
    "ka-cs-scratchpad-audio.s3.amazonaws.com",
    "ka-exercise-screenshots.s3.amazonaws.com",
    "ka-exercise-screenshots-2.s3.amazonaws.com",
    "ka-exercise-screenshots-3.s3.amazonaws.com",
    "ka-learnstorm.s3.amazonaws.com",
    "ka-mobile.s3.amazonaws.com",
    "ka-perseus-graphie.s3.amazonaws.com",
    "ka-perseus-images.s3.amazonaws.com",
]);

// Returns true if this URL is relative, or if it is an absolute
// URL with one of the domains listed above as its hostname.
export function isInternalURL(url) {
    const hostname = getHostname(url);
    return hostname === "" || internalDomains.has(hostname);
}
