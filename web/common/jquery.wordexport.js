if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName) {
            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function() {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            var images = Array();
            //原始版本将图片转成base64编码
//          var img = markup.find('img');
			//解决方案，并解决火狐浏览器兼容问题
            var img = new Image();
            for (var i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                var canvas = document.createElement("CANVAS");
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL("image/png");
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
            }

            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            var styles = '#mytableuser {width: 1100px;padding: 0;margin: 0;border: solid 2px #EDEDED;}#mytableuser th {font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;color: #4f6b72;letter-spacing: 2px;text-transform: uppercase;text-align: left;padding: 6px 6px 6px 12px;}#mytableuser th.nobg {font: bold 14px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;color: #4f6b72;letter-spacing: 2px;text-transform: uppercase;text-align: left;padding: 6px 6px 6px 12px;}#mytableuser td {font-size: 11px;padding: 6px 6px 6px 12px;color: #4f6b72;}#mytableuser td.alt {color: #797268;}#mytableuser th.spec {border-top: 0;}#mytableuser th.specalt {border-top: 0;color: #797268;}'
                    + '#body {background-color: #FFFFFF;padding: 10px 30px 30px 30px;width: 1160px;margin-left: 300px;}#body #tupian {float: left;}#body #tupian #img1 {width: 104px;height: 104px;}#body #test #label1 {font: bold 16px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;color: #4f6b72;letter-spacing: 2px;text-transform: uppercase;text-align: left;padding: 3px;}#body #test #label2 {font: bold 11px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;color: #4f6b72;letter-spacing: 2px;text-transform: uppercase;text-align: left;padding: 3px;}#top {background-color: #D75553;height: 50px;width: 760px;padding-top: 1.5px;}#top #label3 {font: bold 13px "Trebuchet MS", Verdana, Arial, Helvetica, sans-serif;color: #363636;letter-spacing: 2px;text-transform: uppercase;text-align: left;margin-left: 30px;}'
            		+'.ant-table.ant-table-bordered .ant-table-title {border: 1px solid #e8e8e8;padding-left: 16px;padding-right: 16px;}.ant-table-title {padding: 16px 0;position: relative;top: 1px;border-radius: 4px 4px 0 0;}.ant-table {font-family: "Monospaced Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 14px;line-height: 1.5;color: rgba(0, 0, 0, 0.65);-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0;padding: 0;list-style: none;position: relative;clear: both;}.ant-table-thead > tr > th, .ant-table-tbody > tr > td {padding: 16px 16px;word-break: break-all;}';
            // Aggregate parts of the file together
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;
            console.log(fileContent);
            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    }
}
