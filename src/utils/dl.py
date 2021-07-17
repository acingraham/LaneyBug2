from TikTokApi import TikTokApi
import json
from pprint import pprint
import pathlib

api = TikTokApi.get_instance()

urls = open('data.json')
data = json.load(urls)

# pprint(data)
list = data.split(',')
for url in list:
    try:
        print(url)
        author_data = url.split('@')[1];
        author_id = author_data.split('/')[0]
        video_data = url.split('/')[-1]
        video_id = video_data.split('"')[0]
        print('asdfalkja')


        filepath = f'videos/{video_id}.mp4'
        if pathlib.Path(filepath).exists():
            continue

        url = f'https://www.tiktok.com/@{author_id}/video/{video_id}'

        pprint(url)
        dl = api.get_video_by_url(video_url=url, custom_verifyFp="verify_kr50dge1_uRCJZmmF_wDYI_4me7_8nWK_tag6zPdhTZNL")

        with open(filepath, 'wb') as binary_file:
            binary_file.write(dl)
    except:
        print('an error :(')

