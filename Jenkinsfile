pipeline {
    agent any

    parameters {
        string(name: 'TAG_EXPRESSION', defaultValue: '@smoke or @regression', description: 'Cucumber Tag Expression to execute (e.g. @smoke, @regression, @positive, @negative)')
    }

    environment {
        CI = 'true'
        DEFAULT_PASSWORD = credentials('default-test-password')
        CARD_NUMBER = credentials('test-card-number')
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies & Browsers') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps chromium'
            }
        }

        stage('Execute Playwright Cucumber Tests') {
            steps {
                sh "npx cucumber-js --tags \"${params.TAG_EXPRESSION}\""
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
            cucumber buildStatus: 'UNSTABLE',
                     fileIncludePattern: 'reports/cucumber-report.json',
                     sortingCode: 'ALPHABETICAL'
        }
        failure {
            echo 'Playwright Cucumber Test Execution Failed. Inspect archived traces and reports.'
        }
    }
}
