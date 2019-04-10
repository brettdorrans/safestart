export interface IExample {
    readonly name: string;
}

function create(name: string): IExample {
    return { name };
}

export default {
    create
};
