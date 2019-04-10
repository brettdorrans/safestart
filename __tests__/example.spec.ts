import test from 'ava';
import { Example } from '../src';

test('create', t => {
    const example = Example.create('example');

    t.is(example.name, 'example');
});
