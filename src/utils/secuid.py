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
secuid = api.get_secUid(username=user_name, custom_verifyFp="verify_kr50dge1_uRCJZmmF_wDYI_4me7_8nWK_tag6zPdhTZNL")
print(secuid)

