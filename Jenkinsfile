pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Clone Github Repository...'
                git url: 'https://github.com/RoufAufalin/tugas_express.git'
                branch: 'main'
            }
        }

        stage('Inject ENV') {
            steps {
                echo 'Inject ENV...'
                withCredentials([file(credentialsId: 'env-express', variable: 'ENVFILE')]){
                    sh '''
                    rm -f .env
                    cp "$ENVFILE" .env
                    '''
                }

            }
        }


        stage('Build Docker') {
            steps {
                echo 'Building Docker...'
                // For vanilla Express, this might be empty or used for transpiling (Babel/TS)
                // sh 'npm run build'
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker compose down || true
                docker compose up -d --build
                docker ps
                '''
            }
        }

    }

    post {
        success {
            echo "Successfully deployed! Check your app at http://localhost:3000"
        }
        failure {
            echo "Build failed. Check the logs above."
        }
    }
}