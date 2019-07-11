export interface Example {
    readonly name: string;
}

function create(name: string): Example {
    return { name };
}

export default {
    create
};
