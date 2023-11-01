#!/bin/bash
set -e errexit
cd "$( dirname "${BASH_SOURCE[0]}" )"
rm -rf public
hugo
rsync -av --delete public/. all@netpd.org:public_html/new/.
