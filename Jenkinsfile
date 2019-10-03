#!groovy​
@Library('sprockets@2.9.4') _

import common
import git
import hipchat
import node
import frontend

def service = 'Agent-Desktop'
def docker_tag = BUILD_TAG.toLowerCase()
def pr = env.CHANGE_ID
def c = new common()
def n = new node()
def f = new frontend()

//This will stop all old builds so that things are not running in parallel.
c.stop_previous_builds(env.JOB_NAME, env.BUILD_NUMBER.toInteger())

node(){
  pwd = pwd()
}

pipeline {
  agent any
  stages {
    stage ('Setup') {
      parallel {
        stage ('Set build version') {
          steps {
            sh 'echo "Stage Description: Set build version from package.json"'
            script {
              buildTool = c.getBuildTool()
              props = c.exportProperties(buildTool)
              n.export()
              build_version = readFile('version')
            }
          }
        }
        stage ('Setup Docker') {
          steps {
            sh 'echo "Stage Description: Sets up docker image for use in the next stages"'
            sh "rm -rf build; mkdir build -p"
            sh "docker build -t ${docker_tag} -f Dockerfile-build ."
            sh "docker run --rm -t -d --name=${docker_tag} ${docker_tag}"
          }
        }
      }
    }
    stage ('Build') {
      steps {
        sh 'echo "Stage Description: Builds the production version of the lib"'
        sh "docker exec ${docker_tag} npm run build"
        sh "docker cp ${docker_tag}:/home/node/app/build ."
      }
    }
    stage ('Push new tag'){
      when { anyOf {branch 'master';}}
      steps {
        script {
          try {
            git branch: BRANCH_NAME, url: "git@github.com:SerenovaLLC/${service}"
            if (build_version.contains("SNAPSHOT")) {
              sh "if git tag --list | grep ${build_version}; then git tag -d ${build_version}; git push origin :refs/tags/${build_version}; fi"
            }
            sh "git tag -a ${build_version} -m 'release ${build_version}, Jenkins tagged ${BUILD_TAG}'"
            sh "git push origin ${build_version}"
          } catch (e) {
            sh 'echo "Failed create git tag"'
          }
        }
      }
    }
    stage ('Push to jenkins storage S3') {
      when { anyOf {branch 'master';}}
      steps {
        sh 'echo "Stage Description: Pushes build files to S3"'
        sh "aws s3 sync build/ s3://cxengagelabs-jenkins/frontend/${service}/${build_version}/ --delete"
      }
    }
    // TODO add this when we can deploy
    // stage ('Deploy to dev') {
    //   when { anyOf {branch 'master';}}
    //   steps {
    //     build job: 'Deploy - Front-End', parameters: [
    //         [$class: 'StringParameterValue', name: 'Service', value: 'Agent-Desktop'],
    //         [$class: 'StringParameterValue', name: 'Version', value: "${build_version}"],
    //         [$class: 'StringParameterValue', name: 'Environment', value: 'dev']
    //     ]
    //   }
    // }
  }
  post {
    always {
      script {
        try {
          sh "docker rmi ${docker_tag} --force"
        } catch (e) {
          sh 'echo "Failed to remove docker image"'
        }
        c.cleanup()
      }
    }
    success {
      echo 'This will run only if the run was marked as success'
    }
    failure {
      echo 'This will run only if the run was marked as failure'
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
