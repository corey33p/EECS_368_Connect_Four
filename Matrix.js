// 2D matrices only!
class Matrix {
    // (int1,int2) creates a matrix of zeros with int1 rows and int2 columns
    // (array,var) creates a matrix from input array specifying the size
    // (matrix,var)creates a matrix copy from the input matrix
    constructor(parameterA,parameterB) {
        if ((parameterA === parseInt(parameterA, 10)) && (parameterB === parseInt(parameterB, 10))){
            let rows = parameterA;
            let cols = parameterB;
            this.shape=[rows,cols];
            this.size = rows*cols;
            this.matrix = new Array(rows); 
            for (let row = 0; row < rows; row++) {
                this.matrix[row] = new Array(cols);
                for (let col = 0;col < cols; col++) {
                    this.matrix[row][col] = 0;
                }
            }
        } else if (Array.isArray(parameterA)) {
            let inputArray = parameterA;
            let colSize = inputArray[0].length;
            for (let i = 0; i<inputArray.length;i++){ 
                if (inputArray[i].length != colSize) {
                    return console.log("Bad input array.");
                }
            }
            let rows = inputArray.length;
            let cols = inputArray[0].length;
            this.shape=[rows,cols];
            this.size=rows*cols;
            this.matrix = new Array(rows); 
            for (let i = 0; i < rows; i++) {
                this.matrix[i] = new Array(cols);
                for (let j = 0;j < cols; j++) {
                    this.matrix[i][j] = inputArray[i][j];
                }
            }
        } else if (parameterA instanceof Matrix){
            let inputArray = parameterA;
            this.shape=inputArray.shape;
            this.size=inputArray.size;
            this.matrix = inputArray.matrix;
        }
    }
    //
    //
    // check if the matrix contains an instance of a certain value
    any(val){
        for (let row = 0; row < this.shape[0]; row++) {
            for (let col = 0; col < this.shape[1]; col++){
                if (this.matrix[row][col] == val) { return true; }
            }
        }
        return false;
    }
    //
    //
    // --------------- Dot Product between Two Matrices ---------------- //
    dot(otherMatrix){
        // checking correct input
        if (!(otherMatrix instanceof Matrix)) {
            return console.log("Error: Called Matrix.dot with non-Matrix type.");
        }
        if (this.shape[1]!=otherMatrix.shape[0]) {
            return console.log("Size mismatch: "+
                                this.shape[0]+
                                "x"+
                                this.shape[1]+
                                " and "+
                                otherMatrix.shape[0]+
                                "x"+
                                otherMatrix.shape[1]);
        }
        
        // build result matrix
        let rows = this.shape[0];
        let cols = otherMatrix.shape[1];
        let resultMatrix = new Array(rows); 
        for (let row = 0; row < rows; row++) {
            resultMatrix[row] = new Array(cols);
        }
        // calculate result matrix
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++){
                let sum = 0;
                for (let elementIndex = 0; elementIndex < this.shape[1]; elementIndex++){
                    sum = sum + this.matrix[row][elementIndex] * otherMatrix.matrix[elementIndex][col];
                }
                resultMatrix[row][col] = sum;
            }
        }
        return new Matrix(resultMatrix);
    }
    //
    //
    // print a matrix
    print(){
        let str = "";
        let rows = this.shape[0];
        let cols = this.shape[1];
        let maxElementLength = (""+this.max()).length;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let curVal = this.matrix[row][col];
                let curElementLength = (""+curVal).length;
                // console.log("curVal: "+curVal);
                // console.log("curElementLength: "+curElementLength);
                for (let i = 0;i<maxElementLength-curElementLength;i++){
                    str += " ";
                }
                str += this.matrix[row][col];
                if (col < cols - 1){str+=", ";}
            }
            str+="\n";
        }
        console.log(str);
    }
    //
    //
    // reshape a matrix 
    reshape(shape){
        let newRows = 0;
        let newCols = 0;
        if (shape instanceof Matrix) {
            newRows = shape.matrix[0][0];
            newCols = shape.matrix[0][1];
        } else if (shape instanceof Array){
            newRows = shape[0];
            newCols = shape[1];
        } else {
            console.log("Bad input to reshape function: "+shape);
        }
        if (this.size != newRows * newCols){
            console.log("Specified size "+newRows+"x"+newCols+" does not match current size of matrix, which is "+this.size+".");
            return;
        }
        this.size = newRows * newCols;
        let elementsAdded = 0;
        let flatArray = new Array(this.size); 
        for (let row = 0; row < this.shape[0]; row++) {
            for (let col = 0;col < this.shape[1]; col++) {
                flatArray[elementsAdded]=this.matrix[row][col];
                elementsAdded++;
            }
        }
        this.matrix = new Array(newRows);
        if (newRows == 1){
            this.matrix[0] = flatArray;
            this.shape[0]=newRows;
            this.shape[1]=newCols;
            return;
        }
        this.matrix = new Array(newRows); 
        let elementsTranslated = 0;
        for (let row = 0; row < newRows; row++) {
            this.matrix[row] = new Array(newCols);
            for (let col = 0;col < newCols; col++) {
                this.matrix[row][col] = flatArray[elementsTranslated];
                elementsTranslated++;
            }
        }
        this.shape[0] = newRows;
        this.shape[1] = newCols;
        return;
    }
    //
    //
    // pad the matrix
    pad(padSize,padVal){
        let padX = 0;
        let padY = 0;
        if (padSize instanceof Matrix) {
            padX = padSize.matrix[0][0];
            padY = padSize.matrix[0][1];
        } else if (padSize instanceof Array){
            padX = padSize[0];
            padY = padSize[1];
        } else {
            console.log("Bad input for padSize in pad function: "+padSize);
        }
        if (isNaN(padVal)) {
            console.log("Bad input for padVal in pad function: "+padVal);
        }
        let resultRows = this.shape[0]+2*padY;
        let resultCols = this.shape[1]+2*padX;
        let result = new Matrix(resultRows,resultCols);
        for (let row = 0; row < resultRows; row++){
            for (let col = 0; col < resultCols; col++){
                result.matrix[row][col]=padVal;
            }
        }
        for (let row = padY; row < padY + this.shape[0];row++){
            for (let col = padX; col < padX + this.shape[1]; col++){
                result.matrix[row][col]=this.matrix[row-padY][col-padX];
            }
        }
        this.shape[0] = this.shape[0]+2*padY;
        this.shape[1] = this.shape[1]+2*padX;
        this.size = this.shape[0] * this.shape[1];
        this.matrix = result.matrix;
        return;
    }
    //
    //
    // remove all but a certain value in the array
    filter(val){
        let rows = this.shape[0];
        let cols = this.shape[1];
        let resultMatrix = new Array(rows); 
        for (let row = 0; row < rows; row++) {
            resultMatrix[row] = new Array(cols);
        }
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (this.matrix[row][col] == val) {
                    resultMatrix[row][col] = val;
                } else {
                    resultMatrix[row][col] = 0;
                }
            }
        }
        return new Matrix(resultMatrix);
    }
    //
    //
    // max value of array
    max(val){
        let flatArray = new Array(this.size);
        let elementsAdded = 0;
        for (let row = 0; row < this.shape[0]; row++) {
            for (let col = 0; col < this.shape[1]; col++){
                flatArray[elementsAdded] = this.matrix[row][col];
                elementsAdded++;
            }
        }
        return Math.max.apply(null,flatArray);
    }
    //
    //
    // 2d convolution operation (see 'Conv2d notes.docx')
    conv2d(kernel,paddingSize,paddingVal){
        // check inputs
        if (!(kernel instanceof Matrix)) { return console.log("Error: Called Matrix.conv2d with non-Matrix type in first argument.");}
        if (!(paddingSize instanceof Matrix)) {return console.log("Error: Called Matrix.conv2d with non-Matrix type in second argument.");}
        if (isNaN(paddingVal)) {return console.log("Error: Called Matrix.conv2d with non-number "+paddingVal+" in third argument.");}
        // compute size of result
        let kernelStepsPerRow = 2*paddingSize.matrix[0][1]+this.shape[1]-kernel.shape[1]+1;
        let kernelStepsPerCol = 2*paddingSize.matrix[0][0]+this.shape[0]-kernel.shape[0]+1;
        // setup kernel for dot product (see 'Conv2d notes.docx')
        let makeSparseKernel=((kernel,paddingSize,paddingVal)=>{
            let rows = this.shape[0];
            let cols = this.shape[1];
            let rowsInSparseKernel = (2*paddingSize.matrix[0][0]+rows) * 
                                     (2*paddingSize.matrix[0][1]+cols);
            let colsInSparseKernel = (2*paddingSize.matrix[0][0]+rows-kernel.shape[0]+1) * 
                                     (2*paddingSize.matrix[0][1]+cols-kernel.shape[1]+1);
            //
            let sparseKernel = new Matrix(rowsInSparseKernel,colsInSparseKernel);
            for (let sparseKernelCol = 0;sparseKernelCol<colsInSparseKernel;sparseKernelCol++){
                let sparseKernelCurrentRow = (paddingSize.matrix[0][0]-1)*Math.floor(sparseKernelCol / kernelStepsPerRow)+sparseKernelCol;
                for (let rowInInput = 0;rowInInput < rows;rowInInput++){
                    let sparseKernelElementsPlacedInCol = 0;
                    for (let colInInput = 0;colInInput < cols+2*paddingSize.matrix[0][1];colInInput++){
                        if ((rowInInput<kernel.shape[0])&&(colInInput<kernel.shape[1])) {
                            sparseKernel.matrix[sparseKernelCurrentRow][sparseKernelCol]=kernel.matrix[rowInInput][colInInput];
                            sparseKernelElementsPlacedInCol++;
                        }
                        sparseKernelCurrentRow++;
                    }
                }
            }
            return sparseKernel;
        })
        let sparseKernel = makeSparseKernel(kernel,paddingSize,paddingVal);
        let paddedMatrix = new Matrix(this.matrix);
        paddedMatrix.pad(paddingSize,paddingVal);
        let unraveledMatrix = paddedMatrix;
        unraveledMatrix.reshape([1,unraveledMatrix.size]);
        let result = unraveledMatrix.dot(sparseKernel);
        result.reshape([kernelStepsPerCol,kernelStepsPerRow]);
        return result;
    }   
}