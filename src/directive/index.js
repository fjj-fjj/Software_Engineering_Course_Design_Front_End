import { useIntersectionObserver } from '@vueuse/core'
export const lazyPlugin = {
    install(app) {
        console.log(888)
        app.directive('img-lazy', {
            updated:(el, binding)=> {
                const {stop} = useIntersectionObserver(
                    el,
                    ([{ isIntersecting }]) => {
                        console.log(el);
                        console.log(isIntersecting)
                        if (isIntersecting) {
                            console.log(binding.value)
                            el.src = binding.value
                            stop()
                        }
                    },
                )
            }
        })
        console.log(999)
    }
}