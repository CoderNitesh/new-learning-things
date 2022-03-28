import route from "path-match"

export default function createRouter(routes) {
    console.log('routes', routes);
    const matchers = Object.keys(routes).map((path) => [route()(path), routes[path]])
    console.log('matchers', matchers);
    return function (path) { 
        return matchers.some(([matcher, f]) => {
            const result = matcher(path)
            console.log('result', result);
            if (result === false) return false
            f(result)
            return true
        })
    }
}
