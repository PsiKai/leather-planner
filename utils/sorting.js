module.exports = {
    documentSort(docs) {
        let lowestIndex, temp
        for (i = 0; i < docs.length; i++) {
            lowestIndex = i
            for (j = i + 1; j < docs.length; j++) {
                if (docs[j]._id < docs[i]._id) {
                    lowestIndex = j
                    temp = docs[i]
                    docs[i] = docs[j]
                    docs[j] = temp
                }
            }
        }
    }
}
