# Eploy2 makes your deployment easy, forget the worries about the deployment because its all about just a single command.
## Eploy2 makes your files transferring to a server easy at a single command.
Eploy2 supports all types of **Server side programming languages** like Javascript, Typescript, Node, Ruby On Rails, Python, PHP, C#, .Net  etc ..,

## Getting started

### Install via npm 

```sh
$ npm install -g eploy2
```

### Usage in Server Side

Starting an application is as easy as:

```sh
$ eploy2 run
```

Works on Linux (LTS) & macOS (LTS). All Node.js versions are supported starting Node.js 8.X.

For now, we are not supporting to Windows. We are working on it.

Starting an application & kept alive forever:

```sh
$ eploy2 start daemon
```

Eploy2 application is now daemonized and kept alive forever as a background service.

#### Available Commands

```sh
$ eploy2 stop         # Stop a eploy service if it is running.
$ eploy2 start        # start a eploy service if it was stopped.
$ eploy2 restart      # Restart a eploy service.
$ eploy2 delete       # Delete a eploy service from your machine permanently.
```
That's it. You are all set to go. Hope you enjoy the appication. It takes only less than minute.

Let's go to the client side setup.

### Usage in Client Side

First you have to create a **'eploy.config.js'** in a root folder.

```javascript
module.exports = {
    apps: [{
        name: 'CM-V4',
        main : ''
    }],
    cloud_config: {
        staging : {
            host: '147.139.41.95',
            repo: 'git@github.com:dxmari/cm-v4-testing.git',
            ref: 'origin/master',
            application_path: '/root/cm-v4-testing',
            pre_launch_script: 'npm i'
        },
        production : {
            host: '147.139.41.95',
            repo: 'git@github.com:dxmari/cm-v4-testing.git',
            ref: 'origin/master',
            application_path: '/root/cm-v4-testing',
            pre_launch_script: 'npm i'
        }
    },
    transfer_config : {
        staging : {
            host: '147.139.41.95',
            user : 'root',
            source_path : 'sample',
            destination_path : '/root/cm-v4-testing',
            pre_transfer_script : 'gatsby clean'
        },
        production : {
            
        }
    }
}
```
