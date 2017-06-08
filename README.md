# Comparing build time and size between regular functions and class methods

When writing JS code, I'm often looking for a good way to design my code. I'm mostly concerned
about two things: bundle size and build size. I deploy very often, so it's important to me to
try to reduce the build time as much as possible.

This is an experiment to see how long it takes to run Babel and UglifyJS using two separate
approaches. By using regular functions inside another function, which is the case when using
something like webpack, Uglify is free to rename those functions and use smaller names. With
prototypes this is not advised, because Uglify can't know if another package is relying on that
name. However, one could prefix private prototype methods with an underscore for example and
tell Uglify it's okay to mangle methods starting with an underscore. So, the `stats` script
will try to measure those strategies and compare them.

# Running the stats script

    # unless yarn is available, run: npm install
    ./stats

# Results

Here's what I get in my local environment:

```
Time to compile (Babel) a class with methods: 0:02.51
136514  class.js
 - time to minify (Uglify): 0:00.94
72217   class.min.js
8171    class.min.js.gz
 - time to minify (Uglify) with private methods starting with _: 0:01.30
63278   class.min.js
7024    class.min.js.gz
Time to compile (Babel) regular functions: 0:10.96
87041   funcs.js
 - time to minify (Uglify): 0:00.87
34062   funcs.min.js
5672    funcs.min.js.gz
```

So, it takes about 2.5s to compile a class with 1000 methods while compiling 1000 functions take
about 11s, resulting in over 4 times of build time, since the time to run Uglify is about the same.

On the other hand, using regular functions allow a build that is about 81% of the size of a similar
class-based implementation with private methods, or 69% of the size of a similar safer build,
without mangling props.

Please let me know if I'm missing something.
