### Captcha-React-Library

#### Подготовка

Из корневой папки проекта выполнить команды:

`$ npm install`

Для редактирования библиотеки:

`$ npm start`

Чтобы посмотреть как библиотека работает на примере:

`$ cd example`

`$ npm install`

`$ npm start`

#### Использование библиотеки в своих проектах

Из библиотеки следует импортировать компонент-менеджер (CaptchaManager), отвечающий за отображение капчи 
и необходимые для ее запуска параметры (CaptchaProps).
Чтобы стили отображались корректно, следует так же импортировать index.css из библиотеки

```javascript
import { CaptchaManager, CaptchaProps } from 'captcha-react-library/'
import 'captcha-react-library/dist/index.css';
```

Из параметров CaptchaProps получить следующий список параметров:

```javascript
const { captchaIsActive, updateCaptchaIsActive, captchaIsValid, updateCaptchaStatus } = CaptchaProps();
```

Внесите CaptchaManager в конец вашей разметки, как это указано в примере по пути /example/App.js

Передайте в CaptchaManager параметры captchaIsActive, updateCaptchaIsActive, updateCaptchaToken и captchaType

```javascript
<CaptchaManager captchaIsActive={captchaIsActive}
        updateCaptchaIsActive={updateCaptchaIsActive}
        updateCaptchaToken={updateCaptchaToken}
        captchaType='TEXT' />
```

У captchaType может быть 5 значений:

+ 'TEXT' - Менеджер возвращает текстовую капчу
+ 'MATH' - Менеджер возвращает математическую капчу
+ 'AUDIO' - Менеджер возвращает аудио-капчу
+ 'GRAPH' - Менеджер возвращает графическую капчу
+ 'ANIME' - Менеджер возвращает анимированную капчу

Валидация ответов пользователей в своих целей:

Параметр captchaToken из CaptchaProps имеет 2 значения:
+ "a973c0b0-2c20-41ec-96b3-fcffd08a740d" - (Пример токена) Капча успешно пройдена пользователем
+ false - Пользователь не прошел/не смог пройти капчу

Простейший пример использования captchaToken указан в example/App.js
