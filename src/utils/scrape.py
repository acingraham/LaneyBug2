from TikTokApi import TikTokApi
from pprint import pprint
import pathlib

api = TikTokApi.get_instance()
# If playwright doesn't work for you try to use selenium
# api = TikTokApi.get_instance(use_selenium=True)


# Since TikTok changed their API you need to use the custom_verifyFp option. 
# In your web browser you will need to go to TikTok, Log in and get the s_v_web_id value.

user_name = 'andrew_404'
# secuid = api.get_secuid(username=user_name)
# print(secuid);
# user_id = 6820898474930897925
# liked = api.user_liked_by_username(username=user_name, custom_verifyFp="")
count = 10000
liked_videos = api.user_liked_by_username(username=user_name, count=count)
# pprint(liked_videos[0])
# pprint(liked[0]['video'])
# download_addr = liked[0]['video']['downloadAddr']
# play_addr = liked]0['video']['playAddr']

i = 0
pprint(len(liked_videos))
for liked_video in liked_videos:
    i+=1
    try:
        if i < (count - 4000):
            # pprint(i)
            continue
        author_id = liked_video['author']['uniqueId']
        video_id = liked_video['id']

        filepath = f'videos/{video_id}.mp4'
        if pathlib.Path(filepath).exists():
            continue

        url = f'https://www.tiktok.com/@{author_id}/video/{video_id}'

        pprint(url)
        # https://www.tiktok.com/@therock/video/6829267836783971589
        # pprint(liked[0])
        # pprint(download_addr)
        # monitor = monitor_requests.Monitor()
        dl = api.get_video_by_url(video_url=url, custom_verifyFp="verify_kr50dge1_uRCJZmmF_wDYI_4me7_8nWK_tag6zPdhTZNL")
        # monitor.report(urls=True)
        # dl = api.get_video_by_url(video_url=url)
        # pprint(dl)

        with open(filepath, 'wb') as binary_file:
            binary_file.write(dl)
    except:
        print('an error :(')

# trending = api.trending(count=results, custom_verifyFp="")
# for tiktok in trending:
#     # Prints the id of the tiktok
#     print(tiktok['id'])

# print(len(trending))
