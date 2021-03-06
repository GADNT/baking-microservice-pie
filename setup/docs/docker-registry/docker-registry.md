# Local Docker Registry

A Local Docker Registry is used to speed up deployment and to not rely on a possible slow Internet access to the 
Docker Hub. The Docker Images used are not really that big, but they could take sometime to upload on a slow network.

## Setup

The Docker documentation already has a comprehensive guide to setup a Local Docker Registry: 
* https://docs.docker.com/registry/deploying/
* https://docs.docker.com/registry/insecure/

### TL;DR

#### Run
The Local Docker Registry runs like any other Docker Image: 
```bash
docker run -d -p 5000:5000 --restart=always --name docker-registry registry:2
```

--insecure-registry

#### Insecure Registry

For the PI's to be able to download Docker Images from the Local Docker Registry, they need to trust him. The easiest 
way is to add an entry with the Local Docker Registry hostname and port in the file `/etc/docker/daemon.json` The 
Ansible script `setup/ansible/docker-registry/docker-registry.yaml` will handle that for you. Run it from the `ansible` 
directory with:

```bash
ansible-playbook -i hosts docker-registry/docker-registry.yaml
```

After this, make sure you restart your PI Cluster.

#### Box running Local Docker Registry

The Docker process running the Local Docker Registry also requires to trust the Registry. For Macs, the easiest way is 
to add the address the Local Docker Registry address into the Mac Docker Daemon. Go to Preferences menu item, 
Daemon tab and in Insecure Registries section add `docker-registry:5000`.

For the Docker Images to be uploaded to the Local Docker Registry, the Image name needs to be prefixed with 
`docker-registry:5000`. This will be the hostname used to upload the Docker Images. A specific hostname is required, so
that the Docker daemons running on the PI's know how to reach the dedicated Local Docker Registry. 
