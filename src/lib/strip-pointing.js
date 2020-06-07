const stripPointing = ( word ) => {
	return word.replace(/[\u0590-\u05AF\u05BD]/g,"")
		.replace(/[\u05B0-\u05BB]/g,"")
		.replace(/\u05BC/g,"")
		.replace(/\u05C1/g,"")
		.replace(/\u05C2/g,"")
		.replace(/\u05C4/g,"")
		.replace(/\u05C5/g,"");
};

export default stripPointing;
