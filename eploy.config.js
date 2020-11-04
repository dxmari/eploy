module.exports = {
    apps: [{
        name: 'CM-V4',
        main : ''
    }],
    cloud_config: {
        staging : {
            host: '147.139.41.95',
            repo: 'git@github.com:dxmari/cm-v4-testing.git',
            // repo: 'https://github.com/dxmari/cm-v4-testing.git',
            ref: 'origin/master',
            // application_path: '/Users/mariselvam/Documents/Official/React/cm-v4-testing',
            application_path: '/root/cm-v4-testing',
            // pre_launch_script: 'npm i && gatsby build'
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
            pre_launch_script : ''
        },
        production : {
            
        }
    }
}