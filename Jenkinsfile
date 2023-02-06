#!/usr/bin/env groovy
pipeline {
 agent {
    label params.AGENT
  }
  parameters {
    choice(name: "AGENT", choices:["master"])
  }

  environment {
    ECR_PROTOCOL = 'https://'
    ECR_URL = 'registry.kelaspintar.co.id'
    ECR_CREDENTIAL = 'gitlabuser'
    REPO_NAME = 'kpv2/intranet/intranet-fe'
    GET_COMMIT_HASH = get_commit_hash()
    DOCKERFILE = dockerfilename()
  }
  stages {
    stage('Checkout Kelaspintar-Config') {
      steps {
        sh 'mkdir -p kelaspintar-config'
        dir('kelaspintar-config') {
          git branch: 'master',
          credentialsId: 'jenkins_private_key',
          url: 'git@git.kelaspintar.co.id:kelas-pintar/infrasturcture/kelaspintar-config.git'
        }
      }
    }
    stage('Copy Config to development') {
      when {
        expression {
          return ((env.GIT_BRANCH == 'origin/development') || (env.GIT_BRANCH =~ /origin\/feature\/.*$/) || (env.GIT_BRANCH == 'origin/infra-dev'))
        }
      }
      steps {
        sh '''
        cp kelaspintar-config/applications/kelaspintar/kp-intranet-fe/development/* .
        rm -rf kelaspintar-config
        '''
      }
    }
    stage('Copy Config to production') {
      when {
        expression {
          return ((env.GIT_BRANCH == 'origin/main') || (env.GIT_BRANCH =~ /origin\/release\/.*$/) || (env.GIT_BRANCH == 'origin/master'))
        }
      }
      steps {
        sh '''
        cp kelaspintar-config/applications/kelaspintar/kp-intranet-fe/production/* .
        rm -rf kelaspintar-config
        '''
      }
    }
    stage('Docker image push to development') {
      when {
        expression {
          return ((env.GIT_BRANCH == 'origin/development') || (env.GIT_BRANCH =~ /origin\/feature\/.*$/) || (env.GIT_BRANCH == 'origin/infra-dev'))
        }
      }
      steps {
        script {
          docker.build("${ECR_URL}/${REPO_NAME}:dev-${GET_COMMIT_HASH}", "-f ${DOCKERFILE} .")
          docker.withRegistry(ECR_PROTOCOL+ECR_URL,ECR_CREDENTIAL) {
            docker.image("${ECR_URL}/${REPO_NAME}:dev-${GET_COMMIT_HASH}").push("dev-${GET_COMMIT_HASH}")
          }
        }
      }
    }
    stage('Docker Image push Production') {
      when {
        expression {
          return ((env.GIT_BRANCH == 'origin/main') || (env.GIT_BRANCH =~ /origin\/release\/.*$/) || (env.GIT_BRANCH == 'origin/master'))
        }
      }
      steps {
        script {
          docker.build("${ECR_URL}/${REPO_NAME}:prod-${GET_COMMIT_HASH}", "-f ${DOCKERFILE} .")
          docker.withRegistry(ECR_PROTOCOL+ECR_URL,ECR_CREDENTIAL) {
            docker.image("${ECR_URL}/${REPO_NAME}:prod-${GET_COMMIT_HASH}").push("prod-${GET_COMMIT_HASH}")
          }
        }
      }
    }

    stage('Deploy to development') {
      when {
        expression {
          return ((env.GIT_BRANCH == 'origin/development') || (env.GIT_BRANCH =~ /origin\/feature\/.*$/) || (env.GIT_BRANCH == 'origin/infra-dev'))
        }
      }
      steps {
        sh "docker -H tcp://172.29.0.4:2376 stack deploy kp-intranet-fe-development -c docker-compose.yml --prune --with-registry-auth --resolve-image=always"
      }
    }
    stage('Deploy to production') {
      when {
        expression {
          return ((env.GIT_BRANCH == 'origin/main') || (env.GIT_BRANCH =~ /origin\/release\/.*$/) || (env.GIT_BRANCH == 'origin/master'))
        }
      }
      steps {
        sh "docker -H tcp://:2376 stack deploy kp-intranet-fe-production -c docker-compose.yml --prune --with-registry-auth --resolve-image=always"
      }
    }
  }

  post {
    always {
      cleanWs()

      sh 'docker rmi $(docker images -f "dangling=true" -q) -f || true'
    }

    failure {
      mattermostSend(
        color: "#F10E0E",
        icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
        message: "${env.JOB_NAME} - ${currentBuild.displayName} :white_check_mark: ${currentBuild.currentResult} after ${currentBuild.durationString.replace(' and counting', '')} (<${currentBuild.absoluteUrl}|Open>)",
        channel:"#infra-kp-intranet",
        endpoint: "https://mattermost.kelaspintar.co.id/hooks/ki5tgne87if4txwukf9zkxfnna"
        )
    }

    success {
      mattermostSend(
        color: "#439FE0",
        icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
        message: "${env.JOB_NAME} - ${currentBuild.displayName} :white_check_mark: ${currentBuild.currentResult} after ${currentBuild.durationString.replace(' and counting', '')} (<${currentBuild.absoluteUrl}|Open>)",
        channel:"#infra-kp-intranet",
        endpoint: "https://mattermost.kelaspintar.co.id/hooks/ki5tgne87if4txwukf9zkxfnna"
        )
    }

    unstable {
      mattermostSend(
        color: "#F3E80F",
        icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
        message: "${env.JOB_NAME} - ${currentBuild.displayName} :white_check_mark: ${currentBuild.currentResult} after ${currentBuild.durationString.replace(' and counting', '')} (<${currentBuild.absoluteUrl}|Open>)",
        channel:"#infra-kp-intranet",
        endpoint: "https://mattermost.kelaspintar.co.id/hooks/ki5tgne87if4txwukf9zkxfnna"
        )
    }
  }
}

/*
# Return a short commit (from 0 to 7)
*/
def get_commit_hash() {
  return sh(script: "git rev-parse HEAD | cut -c1-7", returnStdout: true).trim()
}

def dockerfilename() {
  String name=''
  if ((env.GIT_BRANCH == 'origin/main') || (env.GIT_BRANCH == 'origin/master') || (env.GIT_BRANCH =~ /origin\/release\/.*$/)){
    name = 'Dockerfile.production'
    } else if ((env.GIT_BRANCH == 'origin/infra_staging') || (env.GIT_BRANCH =~ /origin\/staging\/.*$/)){
      name = 'Dockerfile.staging'
      } else {
        name = 'Dockerfile.development'
      }
      return name
    }
