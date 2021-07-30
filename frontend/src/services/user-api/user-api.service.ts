import { IUser } from 'common/interfaces/user';

class UserApi {
  async update(id: string, properties: IUser): Promise<IUser> {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...properties }),
    };
    try {
      const updatedUser = await fetch(
        `http://localhost:3001/api/user/${id}/profile`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((data) => data);

      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async uploadAvatar(id: string, file: File, fileName: string): Promise<IUser> {
    const fd = new FormData();
    fd.append('image', file, fileName);
    const requestOptions = {
      method: 'PUT',
      body: fd,
    };
    try {
      const updatedUser = await fetch(
        `http://localhost:3001/api/user/${id}/avatar`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((data) => data);

      return updatedUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export { UserApi };
