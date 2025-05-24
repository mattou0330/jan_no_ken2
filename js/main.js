
      $(document).ready(function () {
        // じゃんけんの手を配列で定義
        const hands = ["グー", "チョキ", "パー"];
        const handImages = {
          グー: "images/gu.png",
          チョキ: "images/cho.png",
          パー: "images/par.png",
        };

        // マウスオーバーで画像を拡大
        $("ul li button img").on("mouseenter", function () {
          $(this).css("transform", "scale(1.2)");
          $(this).css("transition", "transform 0.4s ease");
        });

        // マウスが離れたときに元に戻す
        $("ul li button img").on("mouseleave", function () {
          $(this).css("transform", "scale(1)");
        });

        // ボタンがクリックされたときの処理
        $("#gu_btn, #cho_btn, #par_btn").on("click", function () {
          // ユーザーの手を取得
          const userHand = $(this).find("img").attr("alt");

          // コンピュータの手をランダムに選択
          const pcHand = hands[Math.floor(Math.random() * hands.length)];

          // コンピュータの手を画像で表示する前にアニメーションを追加
          $("#pc_hand_img")
            .attr("src", handImages[pcHand])
            .attr("alt", pcHand)
            .css({
              display: "block",
              position: "relative",
              left: "100%", // 画面外から開始
            })
            .animate(
              { left: "45%", transform: "translateX(-50%)" },
              500,
              function () {
                // スライド後に振動アニメーション
                let vibrationCount = 5;
                let vibrationDuration = 50;
                let vibrationDistance = 10;
                let vibration = function (count) {
                  if (count <= 0) return;
                  $("#pc_hand_img")
                    .animate(
                      { top: `-${vibrationDistance}px` },
                      vibrationDuration
                    )
                    .animate(
                      { top: `${vibrationDistance}px` },
                      vibrationDuration,
                      function () {
                        vibration(count - 1);
                      }
                    );
                };
                vibration(vibrationCount);
              }
            );

          // 勝敗を判定
          let result = "";
          if (userHand === pcHand) {
            result = "ドローだ";
          } else if (
            (userHand === "グー" && pcHand === "チョキ") ||
            (userHand === "チョキ" && pcHand === "パー") ||
            (userHand === "パー" && pcHand === "グー")
          ) {
            result = "お前の勝ちだ…";
          } else {
            result = "フハハハハ…お前の負けだ!!";

            // 50%の確率でカットイン処理を実行
            if (Math.random() < 0.5) {
              // 1.5秒後にカットイン処理
              setTimeout(function () {
                const cutInImg = $("<img>")
                  .attr("src", "images/cut_rin.jpg")
                  .css({
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: "translateY(-50%)",
                    zIndex: 1000, // 最前面に表示
                  })
                  .appendTo("body");

                // カットインアニメーション
                cutInImg.animate({ left: "10%" }, 500, function () {
                  // 1秒後に非表示
                  setTimeout(function () {
                    cutInImg.fadeOut(1500, function () {
                      cutInImg.remove();

                      // 勝利メッセージに変更
                      result = "ぐはっお前の勝ちだ…";
                      $("#judgment").text(result);

                      // コンピュータの手を負ける手に変更
                      const losingHand = hands.find(
                        (hand) =>
                          (userHand === "グー" && hand === "チョキ") ||
                          (userHand === "チョキ" && hand === "パー") ||
                          (userHand === "パー" && hand === "グー")
                      );

                      // コンピュータの手を更新
                      $("#pc_hand_img")
                        .attr("src", handImages[losingHand])
                        .attr("alt", losingHand);
                    });
                  }, 1000);
                });
              }, 1000);
            }       }

          // 勝敗を画面に表示
          $("#judgment").text(result);
        });
      });