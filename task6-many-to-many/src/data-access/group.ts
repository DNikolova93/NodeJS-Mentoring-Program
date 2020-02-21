import { Sequelize } from 'sequelize';
import { Group, GroupStatic } from '../types/group';
import { UserStatic } from '../types/user';
import { UserGroupStatic } from '../types/userGroup';

export class GroupData {
  public db: Sequelize;
  public ModelClass: GroupStatic;
  public UserModelClass: UserStatic;
  public UserGroupModelClass: UserGroupStatic;
  constructor(db: Sequelize, ModelClass: any) {
    this.db = db;
    this.ModelClass = ModelClass.GroupModel;
    this.UserModelClass = ModelClass.UserModel;
    this.UserGroupModelClass = ModelClass.UserGroupModel;
  }

  async getAll(): Promise<any> {
    return await this.ModelClass.findAll({
      include: [
        {
          model: this.UserModelClass,
          as: 'users',
          through: { attributes: [] },
        },
      ],
    });
  }

  async get(id: string): Promise<any> {
    return await this.ModelClass.findOne({
      where: { id },
      include: [
        {
          model: this.UserModelClass,
          as: 'users',
          through: { attributes: [] },
        },
      ],
    });
  }

  async updateById(id: string, data: Group): Promise<any> {
    const group = await this.get(id);

    if (!group) {
      throw new Error(`No group was found with ID ${id}`);
    }

    return await this.ModelClass.update({ ...data }, { where: { id }});
  }

  async createGroup(group: Group): Promise<any> {
    const { users, ...data } = group;
    const newGroup = await this.ModelClass.create(data);

    console.log(newGroup);

    if (users && users.length > 0) {
      console.log('users', users);
      users.forEach(async id => {
        const user = await this.UserModelClass.findOne({ where: { id, isDeleted: false }});

        if (!user) {
          throw new Error(`No user was found with ID ${id}`);
        }

        const ug = {
          groupId: newGroup.id,
          userId: id,
        }

        // Create and save a userGroup
        const saveUserGroup = await this.UserGroupModelClass.create(ug);
      });
    }
    // const newGroup = new this.ModelClass(group);
    return newGroup;
  }

  async deleteGroup(id: string): Promise<any> {
    const group = await this.get(id);

    if (!group) {
      throw new Error(`No group was found with ID ${id}`);
    }

    return await this.ModelClass.destroy( { where: { id }});
  }
}
