import User from './user';
import PlayerAds from './player-ads';
import untilLocated from './helpers';
import PlayerEvents from './player-events';
import PlayerTimeline from './player-timline';
import PlayerAnnotations from './player-annotations';


export default class Player {
    constructor() {
        this.user = new User();
    }
    /*
     * Wait for init before use, for ex:
     *
     * const player = new Player();
     * await player.init();
     *
     */
    async init() {
        // FIXME: VideoLink appears after 1.5 seconds, it's too slow, find better way
        this.vidlink = null;
        this.video = await Player.untilVideoAppears();

        this.ads = new PlayerAds();
        this.events = new PlayerEvents(this.video);
        this.timeline = new PlayerTimeline(this.video);
        this.annotations = new PlayerAnnotations();

        this.rightControls = Player.findRightControls();
        this.controlsContainer = Player.findControlsContainer();

        Player.untilVideoLinkAppears().then((link) => { this.vidlink = link; });
    }

    static findVideoTag() {
        return document.getElementsByTagName('video')[0] || null;
    }

    static untilVideoAppears() {
        return untilLocated(Player.findVideoTag);
    }

    static findVideoLink() {
        return document.querySelector('[data-sessionlink="feature=player-title"][href]');
    }

    static untilVideoLinkAppears() {
        return untilLocated(Player.findVideoLink);
    }

    static findControlsContainer() {
        return document.getElementsByClassName('ytp-chrome-bottom')[0] || null;
    }

    static findRightControls() {
        return document.getElementsByClassName('ytp-right-controls')[0] || null;
    }

    getVideoID() {
        function parseYouTubeID(address) {
            const url = new URL(address);
            return url.searchParams.get('v');
        }

        const videoUrl = this.vidlink ? this.vidlink.href : document.URL;
        return parseYouTubeID(videoUrl);
    }

}
