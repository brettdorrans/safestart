export interface IRoot {
    readonly name: string;
}

function create(name: string): IRoot {
    return { name };
}

export default {
    create
};
