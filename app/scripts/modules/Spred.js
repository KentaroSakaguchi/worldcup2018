

class Spred {

  static AnzuSpred() {

    const arrayBase = [1, 2, 3];
    const arraySpredCopy = [...arrayBase];
    arraySpredCopy[1] = 10;
    const newArray = arrayBase;
    newArray[1] = 100;
    console.log('arrayBase:', arrayBase);
    console.log('arraySpredCopy:', arraySpredCopy);
    console.log('newArray:', newArray);

  }
}

export default Spred;