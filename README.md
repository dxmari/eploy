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
        name: '<your-application-name>',
        main : '<main-file>' //optional
    }],
    cloud_config: {
        staging : {
            host: '<your-public-ip-address-or-domain-url-name>',
            repo: '<your-git-repo-path>', // Clone type must be ssh, not supported in https.
            ref: '<your-git-branch-name-with-ref>',  // eg. origin/master
            application_path: '<your-application-path-in-a-server>',
            pre_launch_script: '<launch-script>' // It will execute after update the latest files from the git. eg. 'npm i'
        },
        production : {
            host: '<your-public-ip-address-or-domain-url-name>',
            repo: '<your-git-repo-path>', // Clone type must be ssh, not supported in https.
            ref: '<your-git-branch-name-with-ref>',  // eg. origin/master
            application_path: '<your-application-path-in-a-server>',
            pre_launch_script: '<launch-script>',  //It will execute after update the latest files from the git. eg. 'npm i'
        }
    },
    transfer_config : {
        staging : {
            host: '<your-public-ip-address-or-domain-url-name>',
            user : '<your-server-username>', // eg. ubuntu or root
            source_path : '<source-path-transfer-from>', // which is folder or file path you want to transfer to server
            destination_path : '<destination-path-transfer-to>',
            pre_transfer_script : '<launch-script>', // It will execute before transfer the files to the server. eg. 'ng build or gatsby build'
        },
        production : {
           host: '<your-public-ip-address-or-domain-url-name>',
            user : '<your-server-username>', // eg. ubuntu or root
            source_path : '<source-path-transfer-from>', // which is folder or file path you want to transfer to server
            destination_path : '<destination-path-transfer-to>',
            pre_transfer_script : '<launch-script>', // It will execute before transfer the files to the server. eg. 'ng build or gatsby build'
        }
    }
}
```

