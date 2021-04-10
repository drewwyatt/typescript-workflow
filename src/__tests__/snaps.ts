import toYaml from '../main'

import ci from '../workflows/ci'
import sayHello from '../workflows/say-hello'

test('ci', () => expect(toYaml(ci)).toMatchSnapshot())
test('say-hello', () => expect(toYaml(sayHello)).toMatchSnapshot())
