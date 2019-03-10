import test from 'ava';
import Root from './root';

test('create', t => {
    const root = Root.create('root');

    t.is(root.name, 'root');
});
