// consultar via objetos y metodos
// datos
// estructura

import performer from "./request.js";

export class To_do {
  static async all() {
    let to_dos = await performer({
      type: "listAll",
      payload: {
        limit: 5,
      },
    });

    return to_dos.map((todoJSON) => new To_do(todoJSON));
  }

  constructor(args) {
    this.id = args.id;
    this.completed = args.completed;
    this.title = args.title;
    this.userId = args.userId;
  }

  save = async () => {
    if (this.id) return this.update();

    this.create();
  };

  create = async () => {
    let response = await performer({
      type: "create",
      payload: {
        title: this.title,
      },
    }).then((data) => (this.id = data.id));

    return response;
  };

  update = async () => {
    let response = await performer({
      type: "update",
      payload: {
        id: this.id,
        title: this.title,
      },
    });

    return response;
  };

  destroy = async () => {
    let response = await performer({
      type: "destroy",
      payload: {
        id: this.id,
      },
    });

    return response;
  };
}
