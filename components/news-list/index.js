const itemHeight = 56 * 2;
Component({
    data: {
        childBoxHeight: 0,
    },
    externalClasses: ['t-class'],
    properties: {
        defaultOpen: {
            type: Boolean,
            value: false,
        },
        name: {
            type: String,
            value: '',
        },
        icon: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        }
    },
    methods: {
        switchHandle() {
            const { childBoxHeight } = this.data;
            this.setData({
                childBoxHeight: childBoxHeight > 0 ? 0 : itemHeight,
            });
        },
        tapChild(e) {
            this.triggerEvent('click', e.target.dataset);
        },
    },
});
