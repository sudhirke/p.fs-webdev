//Data Transfer Object (DTO) is an object that defines how the data will be sent over the network. It is used to define the shape of the data that is sent in a request or response. DTOs are used to validate the data that is sent in a request and to ensure that the data is in the correct format.
export class CreateCatDto {
  id: string;
  name: string;
  age: number;
  breed: string;
}
