import Mock from 'mockjs'
import { markRaw, toRaw } from 'vue'
Mock.mock('/api/phones', 'get', ()=>{
    const data = [
        {
          id:0,
          name:'华为'
        },
        {
          id:1,
          name:'苹果'
        },
        {
          id:2,
          name:'OPPO'
        },
        {
          id:3,
          name:'小米'
        },
        {
          id:4,
          name:'VIVO'
        },
        {
          id:5,
          name:'三星'
        },
        {
          id:6,
          name:'其他'
        }
    ]
    const errno = 0
    return {errno, data}
})
Mock.mock(RegExp('/admin/goods/list'),'get', (params_url)=>{
    console.log(params_url)
    const params = params_url.url.slice((params_url.url.indexOf('?') + 1)).split('&').map(
        item => {
            const operation = item.split('=')
            return {
                [operation[0]]: operation[1]
            }
        }
    )
    console.log(params)
    let page = JSON.stringify(params[0])
    page = page.slice((page.indexOf(':') + 1))
    page = page.slice(1, page.length - 2)
    page = parseInt(page)
    console.log(page)
    let pagesize = JSON.stringify(params[1])
    pagesize = pagesize.slice((pagesize.indexOf(':') + 1))
    pagesize = pagesize.slice(1, pagesize.length - 2)
    pagesize = parseInt(pagesize)
    console.log(pagesize)
    const tData = [
        {
            id:1,
            title:'小米14',
            picture:'/assets/phones/1.png',
            price:'4299',
            comment_count:100,
            good_count:100,
            sentiment_score:10
        },
        {
            id:2,
            title:'小米(MI)Redmi Note12',
            picture:'/assets/phones/2.png',
            price:'749',
            comment_count:100,
            good_count:100,
            sentiment_score:20
        },
        {
            id:3,
            title:'小米(MI)Redmi 12C',
            picture:'/assets/phones/3.png',
            price:'539',
            comment_count:100,
            good_count:100,
            sentiment_score:30
        },
        {
            id:4,
            title:'小米(MI)Redmi Note 12T Pro',
            picture:'/assets/phones/4.png',
            price:'1249',
            comment_count:100,
            good_count:100,
            sentiment_score:40
        },
        {
            id:5,
            title:'小米Redmi Note13Pro',
            picture:'/assets/phones/5.png',
            price:'1499',
            comment_count:100,
            good_count:100,
            sentiment_score:40
        },
        {
            id:6,
            title:'小米Redmi 13C',
            picture:'/assets/phones/6.png',
            price:'699',
            comment_count:100,
            good_count:100,
            sentiment_score:50
        },
        {
            id:7,
            title:'小米Redmi K70 Pro',
            picture:'/assets/phones/7.png',
            price:'3799',
            comment_count:100,
            good_count:100,
            sentiment_score:60
        },
        {
            id:8,
            title:'荣耀畅玩20',
            picture:'/assets/phones/8.png',
            price:'699',
            comment_count:100,
            good_count:100,
            sentiment_score:70
        },
        {
            id:9,
            title:'荣耀X50',
            picture:'/assets/phones/9.png',
            price:'1399',
            comment_count:100,
            good_count:100,
            sentiment_score:80
        },
        {
            id:10,
            title:'小米Redmi K70',
            picture:'/assets/phones/10.png',
            price:'2399',
            comment_count:100,
            good_count:100,
            sentiment_score:90
        }
    ]
    let ret = new Array()
    let index = (page - 1) * pagesize
    for(let i=index;i<tData.length&&i<index+pagesize;i++)
    {
        ret.push(tData[i])
    }
    let data = {
        data:ret,
        total:tData.length
    }
    const errno = 0
    return {errno, data}
})
Mock.mock(RegExp('/home/goods'), 'get', (params_url)=>{
    const params = params_url.url.slice((params_url.url.indexOf('?') + 1)).split('&').map(
        item => {
            const operation = item.split('=')
            return {
                [operation[0]]: operation[1]
            }
        }
    )
    let id = JSON.stringify(params[0])
    id = id.slice((id.indexOf(':') + 1))
    id = id.slice(1, id.length - 2)
    id = parseInt(id)
    const tData = [
        {
            id:1,
            title:'小米14',
            picture:'/assets/phones/1.png',
            price:'4299',
            comment_count:100,
            good_count:100,
            sentiment_score:10,
            comments:[
                {
                    comment_id:1,
                    content:'用起来感觉很好',
                    creation_time:'2024-4-11'
                }
            ]
        },
        {
            id:2,
            title:'小米(MI)Redmi Note12',
            picture:'/assets/phones/2.png',
            price:'749',
            comment_count:100,
            good_count:100,
            sentiment_score:20
        },
        {
            id:3,
            title:'小米(MI)Redmi 12C',
            picture:'/assets/phones/3.png',
            price:'539',
            comment_count:100,
            good_count:100,
            sentiment_score:30
        },
        {
            id:4,
            title:'小米(MI)Redmi Note 12T Pro',
            picture:'/assets/phones/4.png',
            price:'1249',
            comment_count:100,
            good_count:100,
            sentiment_score:40
        },
        {
            id:5,
            title:'小米Redmi Note13Pro',
            picture:'/assets/phones/5.png',
            price:'1499',
            comment_count:100,
            good_count:100,
            sentiment_score:40
        },
        {
            id:6,
            title:'小米Redmi 13C',
            picture:'/assets/phones/6.png',
            price:'699',
            comment_count:100,
            good_count:100,
            sentiment_score:50
        },
        {
            id:7,
            title:'小米Redmi K70 Pro',
            picture:'/assets/phones/7.png',
            price:'3799',
            comment_count:100,
            good_count:100,
            sentiment_score:60
        },
        {
            id:8,
            title:'荣耀畅玩20',
            picture:'/assets/phones/8.png',
            price:'699',
            comment_count:100,
            good_count:100,
            sentiment_score:70
        },
        {
            id:9,
            title:'荣耀X50',
            picture:'/assets/phones/9.png',
            price:'1399',
            comment_count:100,
            good_count:100,
            sentiment_score:80
        },
        {
            id:10,
            title:'小米Redmi K70',
            picture:'/assets/phones/10.png',
            price:'2399',
            comment_count:100,
            good_count:100,
            sentiment_score:90
        }
    ]
    let data = tData[id-1]
    let errno = 0
    return {
        errno,
        data
    }
})