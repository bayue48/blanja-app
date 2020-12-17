const myBagReducer = (prevState = { myBag: []}, action) => {

    switch (action.type) {
        case "ADD_ITEMS":
            return {
                ...prevState,
                myBag: [...prevState.myBag, action.data]
            }
        default:
            return {
                ...prevState,
            }
    }
}

export default myBagReducer