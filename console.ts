function testing(){
    var originalFunc = Error.prepareStackTrace;

    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = (err.stack as []).shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack[0];

            if(currentfile !== callerfile) break;
        }
    } catch (e) {
        console.log('catch error',e)
    }

    Error.prepareStackTrace = originalFunc; 

    return callerfile;
} 


console.log(testing())