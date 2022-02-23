env = process.env;
const LogService = {

    init () {
        if (env === "DEV") {

        } else if (env === "PRD") {
            this.debug = {};
        };
    },



    debug: (str) => console.log(str),
    error: (str) => console.error(str)
}

LogService.debug("12312312")

LogService.error('w234234234')
