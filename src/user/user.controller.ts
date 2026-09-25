import { Controller, Get, Query, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  //defiune GET /users route
  // TODO: Read from database
  users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Sudhir Kesharwani' },
    { id: 4, name: 'Madhura Kesharwani' },
    { id: 5, name: 'Abhishek Banerjee' },
  ];

  @Get()
  getUsers(@Query('name') name: string) {
    if (name) {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.users.find((user) => user.id === parseInt(id));
  }
}
