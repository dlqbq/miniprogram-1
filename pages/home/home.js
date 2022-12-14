import list from './data/index';
Page({
    data: {
        list,
        name: 'loading'
    },
    onLoad(options) {
        const { path, q } = options;
        console.log(path);
        if (q) {
            const str = this.getQueryByUrl(decodeURIComponent(q));
            console.log(str, str.page);
            wx.navigateTo({
                url: `/pages/${str.page}/${str.page}`,
            });
        }

        let that = this
        wx.request({
          url: 'https://dlqbq.github.io/dlqbq/data.json',
          method:'GET',
          header:{
            'Content-Type': ' application/json'
          },
          data:{
          },
          success:(res)=>{
            console.log(res)
            that.setData(res.data)
          },
          fail:(res)=>{
            console.log(res)
            that.setData({'name':'数据读取失败，请联系管理员！'})
          }
        })
    },
    refreshData(e) {
        let that = this
        wx.request({
          url: 'https://dlqbq.github.io/dlqbq/news.json',
          method:'GET',
          header:{
            'Content-Type': ' application/json'
          },
          data:{
          },
          success:(res)=>{
            console.log(res)
            that.setData(res.data)
          },
          fail:(res)=>{
            console.log(res)
            that.setData({'name':'数据读取失败，请联系管理员！'})
          }
        })
    },
    showNewsDetail(e) {
      let { content = '' } = e.content;
      console.log(content)
    },
    clickHandle(e) {
        let { name, path = '' } = e.detail.item;
        if (!path) {
            name = name.replace(/^[A-Z]/, (match) => `${match}`.toLocaleLowerCase());
            name = name.replace(/[A-Z]/g, (match) => {
                return `-${match.toLowerCase()}`;
            });
            path = `/pages/${name}/${name}`;
        }
        wx.navigateTo({
            url: path,
            fail: () => {
                wx.navigateTo({
                    url: '/pages/home/navigateFail/navigateFail',
                });
            },
        });
    },
    onShareAppMessage() {
        return {
            title: 'TDesign UI',
            path: '/pages/home/home',
        };
    },
    getQueryByUrl(url) {
        const data = {};
        const queryArr = `${url}`.match(/([^=&#?]+)=[^&#]+/g) || [];
        if (queryArr.length) {
            queryArr.forEach((para) => {
                const d = para.split('=');
                const val = decodeURIComponent(d[1]);
                if (data[d[0]] !== undefined) {
                    data[d[0]] += `,${val}`;
                }
                else {
                    data[d[0]] = val;
                }
            });
        }
        return data;
    },
});
