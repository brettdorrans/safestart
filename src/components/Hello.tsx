import * as React from 'react';

export interface IProps {
    readonly noun: string;
}

export const Hello = (props: IProps) => <h1>Hello {props.noun}!</h1>;
