const reducer = (state = {}, action) => {
	switch(action.type){
		case "INCREMENT":
			return state.update("number", value => value + 1)

		case "DECREMENT":
			return state.update("number", value => value - 1)

		default:
			return state
	}
}
export default reducer