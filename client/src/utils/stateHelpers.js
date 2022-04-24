export const syncMonthlyLists = (month, updatedList) => {
  const existingListIndex = month.findIndex(list => updatedList.name === list.name)
  if (existingListIndex >= 0) {
    let existingList = month[existingListIndex]
    existingList = Object.assign(existingList, updatedList)
    month[existingListIndex] = existingList
  } else {
    month = [...month, updatedList].sort((a, b) => new Date(a.name) - new Date(b.createdAt))
  }
  return month
}
