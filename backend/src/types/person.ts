interface Person {
  //   id: string;
  name: {
    type: String;
    minLength: 3;
    required: true;
  };
  number: string;
}
export default Person;
