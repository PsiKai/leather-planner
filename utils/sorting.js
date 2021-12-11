module.exports = {
    documentSort(docs) {
        let temp
        for (i = 0; i < docs.length; i++) {
            for (j = i + 1; j < docs.length; j++) {
                if (docs[j]._id < docs[i]._id) {
                    temp = docs[i]
                    docs[i] = docs[j]
                    docs[j] = temp
                }
            }
        }
    }
}
