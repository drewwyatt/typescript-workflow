import toYaml from '../main'
import sayHello from './workflows/say-hello'

test('say-hello', () => expect(toYaml(sayHello)).toMatchSnapshot())
