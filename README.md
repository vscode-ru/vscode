# Visual Studio Code - Открытый исходный код ("Code - OSS")
[![Feature Requests](https://img.shields.io/github/issues/microsoft/vscode/feature-request.svg)](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)
[![Bugs](https://img.shields.io/github/issues/microsoft/vscode/bug.svg)](https://github.com/microsoft/vscode/issues?utf8=✓&q=is%3Aissue+is%3Aopen+label%3Abug)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-yellow.svg)](https://gitter.im/Microsoft/vscode)

## Репозиторий

В этом репозитории ("`Code - OSS`") мы (Microsoft) вместе с сообществом разрабатываем продукт [Visual Studio Code](https://code.visualstudio.com). Мы не только работаем над кодом и проблемами здесь, мы также публикуем нашу [дорожную карту](https://github.com/microsoft/vscode/wiki/Roadmap), [ежемесячные планы итераций](https://github.com/microsoft/vscode/wiki/Iteration-Plans) и наши [планы завершения](https://github.com/microsoft/vscode/wiki/Running-the-Endgame). Этот исходный код доступен всем по стандартной [лицензии MIT](https://github.com/microsoft/vscode/blob/main/LICENSE.txt).

## Visual Studio Code

<p align="center">
  <img alt="VS Code in action" src="https://user-images.githubusercontent.com/35271042/118224532-3842c400-b438-11eb-923d-a5f66fa6785a.png">
</p>

[Visual Studio Code](https://code.visualstudio.com) - это дистрибутив репозитория `Code - OSS` со специфическими настройками Microsoft, выпущенный под традиционной [лицензией на продукт Microsoft](https://code.visualstudio.com/License/).

[Visual Studio Code](https://code.visualstudio.com) сочетает в себе простоту редактора кода с тем, что нужно разработчикам для их основного цикла редактирования-сборки-отладки. Он обеспечивает всестороннее редактирование кода, навигацию и поддержку понимания, а также облегченную отладку, богатую модель расширяемости и легкую интеграцию с существующими инструментами.

Visual Studio Code обновляется ежемесячно с новыми функциями и исправлениями ошибок. Вы можете скачать его для Windows, macOS и Linux на [веб-сайте Visual Studio Code](https://code.visualstudio.com/Download). Чтобы получать последние выпуски каждый день, установите [Сборку для инсайдеров](https://code.visualstudio.com/insiders).

## Контрибьютинг

Есть много способов принять участие в этом проекте, например:

* [Отправляйте сообщения об ошибках и запросы функций](https://github.com/microsoft/vscode/issues) и помогайте нам проверять, когда они регистрируются
* Просмотрите [изменения исходного кода](https://github.com/microsoft/vscode/pulls)
* Просмотрите [документацию](https://github.com/microsoft/vscode-docs) и делайте запросы на исправление ошибок, начиная от опечаток и заканчивая дополнительными и новыми материалами

Если вы заинтересованы в устранении проблем и внесении непосредственного вклада в базу кода, ознакомьтесь с документацией [Как внести вклад](https://github.com/microsoft/vscode/wiki/How-to-Contribute), который охватывает следующие:

* [Как собрать и запустить из исходного кода](https://github.com/microsoft/vscode/wiki/How-to-Contribute)
* [Рабочий процесс разработки, включая отладку и запуск тестов](https://github.com/microsoft/vscode/wiki/How-to-Contribute#debugging)
* [Рекомендации по кодированию](https://github.com/microsoft/vscode/wiki/Coding-Guidelines)
* [Отправка пулл реквестов](https://github.com/microsoft/vscode/wiki/How-to-Contribute#pull-requests)
* [Поиск проблемы для работы](https://github.com/microsoft/vscode/wiki/How-to-Contribute#where-to-contribute)
* [Содействие переводам](https://aka.ms/vscodeloc)

## Обратная связь

* Задайте вопрос на [Stack Overflow](https://stackoverflow.com/questions/tagged/vscode)
* [Запросить новую функцию](CONTRIBUTING.md)
* Голосование за [популярные запросы функций](https://github.com/microsoft/vscode/issues?q=is%3Aopen+is%3Aissue+label%3Afeature-request+sort%3Areactions-%2B1-desc)
* [Сообщить о проблеме](https://github.com/microsoft/vscode/issues)
* Следите [@code](https://twitter.com/code) и дайте нам знать, что вы думаете!

Смотрите нашу [wiki](https://github.com/microsoft/vscode/wiki/Feedback-Channels) для описания каждого из этих каналов и информации о некоторых других доступных каналах сообщества.

## Связанные проекты

Многие из основных компонентов и расширений VS Code находятся в собственных репозиториях на GitHub. Например, [node debug adapter](https://github.com/microsoft/vscode-node-debug) и [mono debug adapter](https://github.com/microsoft/vscode-mono-debug) есть свои репозитории. Чтобы увидеть полный список, посетите страницу [Связанные проекты](https://github.com/microsoft/vscode/wiki/Related-Projects) в нашей [wiki](https://github.com/microsoft/vscode/wiki).

## Связанные расширения

VS Code включает набор встроенных расширений, расположенных в папке [extensions](extensions), включая грамматики и фрагменты для многих языков. Расширения, обеспечивающие богатую языковую поддержку (завершение кода, переход к определению) для языка, имеют суффикс `language-features`. Например, расширение `json` обеспечивает раскраску для `JSON`, а `json-language-features` обеспечивает богатую языковую поддержку для `JSON`.

## Контейнер для разработки

Этот репозиторий включает контейнер разработки Visual Studio Code Remote - Containers / GitHub Codespaces.

- Для [Remote - Containers](https://aka.ms/vscode-remote/download/containers) используйте команду **Remote-Containers: Clone Repository in Container Volume...**, которая создает том Docker для лучший дисковый I/O в macOS и Windows.
- Для Codespaces установите расширение [Github Codespaces](https://marketplace.visualstudio.com/items?itemName=GitHub.codespacese) в VS Code и используйте команду **Codespaces: Create New Codespace**.

Docker / Codespace должен иметь как минимум **4 ядра и 6 ГБ ОЗУ (рекомендуется 8 ГБ)** для запуска полной сборки. Смотрите [контейнера разработки README](.devcontainer/README.md) для получения дополнительной информации.

## Нормы поведения

В этом проекте принят [Кодекс поведения с открытым исходным кодом Microsoft](https://opensource.microsoft.com/codeofconduct/). Для получения дополнительной информации смотрите [Часто задаваемые вопросы о Кодексе поведения](https://opensource.microsoft.com/codeofconduct/faq/) или свяжитесь с [opencode@microsoft.com](mailto:opencode@microsoft.com) с любыми дополнительными вопросами или комментариями.

## Лицензия

Авторское право (c) Корпорация Microsoft. Все права защищены.

Под лицензией [MIT](LICENSE.txt).
