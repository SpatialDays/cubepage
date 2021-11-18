tag=$(cat tag)
app="cubepage"
ns="$app"
github_user="jackjoy"

git pull
docker build . -t $github_user/$app:$tag
docker push jackjoy/$app:$tag
cat deploy.yaml.template | sed "s/@@@@tag@@@@/$tag/g" | sed "s/@@@@app@@@@/$app/g" | sed "s/@@@@ns@@@@/$ns/g" >deploy.yaml
kubectl apply -f deploy.yaml
echo "sleeping for 10 seconds to wait for deployment"
sleep 10
pod=$(kubectl get pods -n $ns | grep ^$app | grep Running | awk {'print $1'})
log_cmd="kubectl logs $pod -n cubeproxy"
$log_cmd
echo "re-run logs: $log_cmd"
