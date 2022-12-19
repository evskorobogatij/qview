# Утилита удаленного управления 

![изображение](https://user-images.githubusercontent.com/66483307/208099091-3f5eeca5-5e1b-469c-adb8-3849557c89ba.png)

## Сборка

Для сборки проекта необходимо наличие golang, nodejs а также wails. Более подробно об установке wails можно ознакомиться по ссылке https://wails.io/docs/gettingstarted/installation

После установки всех необходимых компонент необходимо выполнить  вкорне проекта  `wails dev` для запуска отладочной версии или `wails build` для сборки проекта.

## Требования к запуску

Список компьютеров берется из внешнего сервиса. Адрес к нему указывается в конфигурационном файле `config.yalm`, параметр `url`.
Ответ сервера должен преставлять собой массив следующих элементов:
```
{
 id: string;
 node_name: string;
 serialnumber: string;
 room: string;
 manufacturer: string;
 cpu_model: string;
 fio_user: string;
 user_phone: string;
 ip: string;
 mac: string;
 department: string;
 type: string;
 os: string;
 osrelease: string;
 created_at: string;
 updated_at: string;
}
```
Если в сети развернут https://github.com/evskorobogatij/salt-manage, то в качестве url можно указать http://*адрес сервиса*/api/minion/


## Разработка

Утилита состоит из 2х частей: ядро системы написано на golang, а интерфейсная часть использует typescript, react, tailwindcss и effector.

На проекте используется кодогенерация. Так для создания компонента необходимо в каталоге ./front выполнить 
```
yarn new:component
```
и ответить на задаваемые вопросы. Необходимые файлы будут сгеннерированы автоматически. 

Для создания хранилища эффектора необходимо выполнить
```
yarn new:store
```
