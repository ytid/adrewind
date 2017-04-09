
class ADRElements {

    constructor() {
        this.findBody();
        this.findVideoTag();
        this.findControlsContainer();
        this.findRightControls();
        this.findADContainer();
        this.addIDScript();
    }

    findBody() {
        this.body = document.getElementsByTagName('body')[0] || null;
    }

    findVideoTag() {
        this.video = document.getElementsByTagName('video')[0] || null;
        return this.video;
    }

    findControlsContainer() {
        this.controlsContainer = document.getElementsByClassName('ytp-chrome-bottom')[0] || null;
        return this.controlsContainer;
    }

    findRightControls() {
        this.rightControls = document.getElementsByClassName('ytp-right-controls')[0] || null;
        return this.rightControls;
    }

    findADContainer() {
        this.videoContainer = document.getElementsByClassName('ad-container')[0] || null;
        return this.videoContainer;
    }

    findAnnotationsToggle() {
        const gear = document.getElementsByClassName('ytp-settings-button')[0];
        if (!gear) {
            return null;
        }
        gear.click();
        gear.click();
        return document.querySelector('[role="menuitemcheckbox"]:nth-child(2)');
    }

    adIsShowing() {
        // TODO: fix this function, .ad-showing class doesn't removes
        // after banner above timline is closed
        const container = this.findADContainer();

        if (!container) {
            return false;
        }

        const content = container.children;

        if (!content || !content.length) {
            return false;
        }

        // TODO: test this solution
        return content[0].classList.contains('videoAdUi');
        // return container.classList.contains('ad-showing');
    }

    getUserID() {
        const div = document.getElementById('adr-youtube-channel-id');

        if (!div || !div.dataset || !div.dataset.channel) {
            return null;
        }

        return div.dataset.channel;
    }

    addIDScript() {
        const body = document.getElementsByTagName('body')[0];
        const script = document.createElement('script');
        script.innerHTML = `(function() {
            function getUserID() {
                let params;
                let ghelp;
                let chanid;

                try {
                    params = window.ytInitialData.responseContext.serviceTrackingParams;
                    ghelp = params.filter(i => i.service === "GUIDED_HELP")[0];
                    chanid = ghelp.params.filter(i => i.key === "creator_channel_id")[0];
                } catch (e) {
                    return null;
                }

                return chanid.value || null;
            }
            const body = document.getElementsByTagName('body')[0];
            const div = document.createElement('div');

            div.id = "adr-youtube-channel-id";
            div.dataset.channel = getUserID();

            body.appendChild(div);
        })();`;
        document.head.appendChild(script);
    }
}


class ADRObserver {

    // constructor() {}

    onPlayerResize(callback) {
        const observer = new MutationObserver(callback);
        const config = {
            attributes: true,
            attributeFilter: ['style'],
        };
        observer.observe(adrElements.video, config);

        return observer;
    }

    onSRCChanged(callback) {
        if (!adrElements.video) {
            this.waitForVideo().then(() => this.onSRCChanged(callback));
            return null;
        }

        callback();

        const observer = new MutationObserver(callback);
        const config = {
            attributes: true,
            attributeFilter: ['src'],
        };
        observer.observe(adrElements.video, config);

        return observer;
    }

    onPlaying(callback) {
        const playing = !adrElements.video.paused && !adrElements.video.ended;

        if (playing) {
            callback(null);
            return;
        }

        const onplaying = (e) => {
            adrElements.video.removeEventListener('playing', onplaying);
            callback(e);
        };
        adrElements.video.addEventListener('playing', onplaying);
    }

    waitForVideo() {
        const CHECK_FREQ = 2000; // ms

        return new Promise((resolve) => {
            const wait = setInterval(() => {
                const found = adrElements.findVideoTag();
                if (!found) { return; }

                resolve();
                clearInterval(wait);
            }, CHECK_FREQ);
        });
    }
}

class NoElementError extends Error {}


const adrElements = new ADRElements();
const adrObserver = new ADRObserver();
