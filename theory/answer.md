## код будет выводить 4 раза Bad: undefind
### это происходит из-за того что после задержки в 3000 i - индекс элемента, которого нет в массиве, поэтому undefind


# 1 (удержать i для каждой итерации)
```
    const arr = [10, 12, 15, 21];

    for (var i = 0; i < arr.length; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
        }, 3000)
    })(i);
}
```
# 2 (let вместо var, мы создаем i с помощью let для каждой итерации и каждая переменная имеет собственную область видимости )
```
const arr = [10, 12, 15, 21];

for (let i = 0; i < arr.length; i++) {
    setTimeout(function() {
        console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`)
    }, 3000)
}

```